namespace LngChat.WebAPI.Utils.Auth.TokenValidation
{
    public class TokenValidationResult
    {
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool Success { get; set; }

        public string ProfilePictureUrl { get; set; }

        public string ErrorMessage { get; set; }

        public TokenValidationResult(string email, string firstName, string lastName, string profilePictureUrl)
        {
            Success = true;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            ProfilePictureUrl = profilePictureUrl;
        }

        public TokenValidationResult(string errorMessage)
        {
            Success = false;
            ErrorMessage = errorMessage;
        }
    }
}
