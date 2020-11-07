using System;
using System.Collections.Generic;

namespace LngChat.Business.Validation.Attributes
{
    public class GreaterThanAttribute : PropertyValidationAttribute
    {
        protected override Dictionary<Type, Func<object, object, bool>> Validators => new Dictionary<Type, Func<object, object, bool>>
        {
            { typeof(int), (a, b) => (int)a > (int)b }
        };

        public GreaterThanAttribute(string propertyName): base(propertyName)
        {
            
        }
    }
}
