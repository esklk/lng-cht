using System;

namespace LngChat.Business.Exceptions
{
    public class ArgumentNullEmptyOrWhitespaceStringException : ArgumentException
    {
        public ArgumentNullEmptyOrWhitespaceStringException(string paramName) : base("Value must not be null, empty or whitespace string.", paramName)
        {

        }
    }
}
