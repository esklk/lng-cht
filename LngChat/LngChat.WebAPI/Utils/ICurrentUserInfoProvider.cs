namespace LngChat.WebAPI.Utils
{
    public interface ICurrentUserInfoProvider
    {
        string Email { get; }
        string FirstName { get; }
        int Id { get; }
        string LastName { get; }
    }
}