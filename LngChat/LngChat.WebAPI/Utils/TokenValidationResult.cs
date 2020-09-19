﻿namespace LngChat.WebAPI.Utils
{
    public class TokenValidationResult
    {
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool Success { get; set; }

        public string ErrorMessage { get; set; }

        public TokenValidationResult(string email, string firstName, string lastName)
        {
            Success = true;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
        }

        public TokenValidationResult(string errorMessage)
        {
            Success = false;
            ErrorMessage = errorMessage;
        }
    }
}
