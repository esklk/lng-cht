using AutoMapper;
using LngChat.Business.Exceptions;
using LngChat.Business.Models;
using LngChat.Data;
using LngChat.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LngChat.Business.Services
{
    public class ChatService : IChatService
    {
        public readonly LngChatDbContext _context;
        public readonly IMapper _mapper;

        public ChatService(LngChatDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ChatPreviewModel[]> GetChatListAsync(int userId, int limit, int offset)
        {
            return await _mapper
                .ProjectTo<ChatPreviewModel>(BuildGetUserChatsQuery(userId, limit, offset), new { currentUserId = userId })
                .ToArrayAsync();
        }

        public async Task<int[]> GetChatIdsAsync(int userId)
        {
            return await BuildGetUserChatsQuery(userId).Select(x => x.Id).ToArrayAsync();
        }

        public async Task<MessageModel[]> GetMessagesAsync(int userId, int chatId, int limit, int offset)
        {
            return await _mapper.ProjectTo<MessageModel>(_context
                    .Messages
                    .Where(x => x.Chat.Id == chatId && x.Chat.UserChats.Any(x => x.UserId == userId)))
                .OrderBy(x => x.SentAt)
                .Skip(offset)
                .Take(limit)
                .ToArrayAsync();
        }

        public async Task<MessageModel> SendMessageToUserAsync(int senderUserId, int recieverUserId, string contentType, string content)
        {
            if ((await _context.Users.CountAsync(x => x.Id == senderUserId || x.Id == recieverUserId)) != 2)
            {
                throw new ArgumentException("Values must be identifiers of existed users", $"{nameof(senderUserId)}, {nameof(recieverUserId)}");
            }

            var chat = await _context.Chats
                .Include(x => x.Messages)
                .FirstOrDefaultAsync(x => x.UserChats.Any(y => y.UserId == senderUserId) && x.UserChats.Any(y => y.UserId == recieverUserId));

            if (chat == null)
            {
                var chatEntry = await _context.Chats.AddAsync(new Chat());

                chatEntry.Entity.Messages = new List<Message>();
                chatEntry
                    .Entity
                    .UserChats = new[]
                    {
                        new UserChat
                        {
                            Chat = chatEntry.Entity,
                            UserId = senderUserId
                        },
                        new UserChat
                        {
                            Chat = chatEntry.Entity,
                            UserId = recieverUserId
                        }
                    };

                chat = chatEntry.Entity;
            }

            var message = AddMessageToChat(chat, senderUserId, contentType, content);

            await _context.SaveChangesAsync();

            return _mapper.Map<MessageModel>(message);
        }

        public async Task<MessageModel> SendMessageToChatAsync(int senderUserId, int chatId, string contentType, string content)
        {
            if (!await _context.Users.AnyAsync(x => x.Id == senderUserId))
            {
                throw new ArgumentException("Value must be an identifier if existed user.", nameof(senderUserId));
            }

            var chat = await _context
                .Chats
                .Include(x => x.Messages)
                .SingleOrDefaultAsync(x => x.Id == chatId)
                ?? throw new ArgumentException("Value must be an identifier of existed chat.", nameof(chatId));

            var message = AddMessageToChat(chat, senderUserId, contentType, content);

            await _context.SaveChangesAsync();

            return _mapper.Map<MessageModel>(message);
        }

        private static Message AddMessageToChat(Chat chat, int senderUserId, string contentType, string content)
        {
            if(chat == null)
            {
                throw new ArgumentNullException(nameof(chat));
            }

            if (string.IsNullOrWhiteSpace(content))
            {
                throw new ArgumentNullEmptyOrWhitespaceStringException(nameof(content));
            }

            if (!Enum.TryParse<MessageType>(contentType, true, out var messageType))
            {
                throw new ArgumentException($"Value must be one of following: [{string.Join(", ", Enum.GetValues(typeof(MessageType)))}].", nameof(contentType));
            }

            var message = new Message
            {
                ChatId = chat.Id,
                SenderId = senderUserId,
                Type = messageType,
                Content = content,
                SentAt = DateTime.UtcNow
            };

            chat.Messages.Add(message);

            return message;
        }

        private IQueryable<Chat> BuildGetUserChatsQuery(int userId, int limit = 0, int offset = 0)
        {
            var query = _context.Chats.Where(x => x.UserChats.Any(x => x.UserId == userId));

            if (offset > 0)
            {
                query = query.Skip(offset);
            }

            if (limit > 0)
            {
                query = query.Take(limit);
            }

            return query;
        }
    }
}
