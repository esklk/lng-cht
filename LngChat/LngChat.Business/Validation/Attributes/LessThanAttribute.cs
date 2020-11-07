using System;
using System.Collections.Generic;

namespace LngChat.Business.Validation.Attributes
{
    public class LessThanAttribute : PropertyValidationAttribute
    {
        protected override Dictionary<Type, Func<object, object, bool>> Validators => new Dictionary<Type, Func<object, object, bool>>
        {
            { typeof(int), (a, b) => (int)a < (int)b }
        };

        public LessThanAttribute(string propertyName) : base(propertyName)
        {

        }
    }
}
