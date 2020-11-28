using AutoMapper;
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
                .ProjectTo<ChatPreviewModel>(_context
                    .Chats
                    .Where(x => x.UserChats.Any(x => x.UserId == userId)), new { currentUserId = userId })
                .Skip(offset)
                .Take(limit)
                .ToArrayAsync();
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

        public async Task SendMessageAsync(int senderUserId, int recieverUserId, string messageText)
        {
            if (string.IsNullOrWhiteSpace(messageText))
            {
                throw new ArgumentNullException(nameof(messageText));
            }

            if ((await _context.Users.CountAsync(x => x.Id == senderUserId || x.Id == recieverUserId)) != 2)
            {
                throw new InvalidOperationException("Sender and reciever should exist in database.");
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

            chat.Messages.Add(new Message
            {
                Content = messageText,
                SentAt = DateTime.UtcNow,
                SenderId = senderUserId
            });

            await _context.SaveChangesAsync();
        }
    }
}
