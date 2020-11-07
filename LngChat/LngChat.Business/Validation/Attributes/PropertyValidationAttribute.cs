using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LngChat.Business.Validation.Attributes
{
    public abstract class PropertyValidationAttribute : ValidationAttribute
    {
        private readonly string _propertyName;

        public PropertyValidationAttribute(string propertyName)
        {
            if (string.IsNullOrWhiteSpace(propertyName))
            {
                throw new ArgumentNullException(nameof(propertyName));
            }
            _propertyName = propertyName;
        }

        protected abstract Dictionary<Type, Func<object, object, bool>> Validators
        {
            get;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var valueType = value.GetType();
            
            if(!Validators.TryGetValue(valueType, out var validator))
            {
                throw new NotImplementedException("No validation implemented for this type.");
            }

            var objectProperty = validationContext
                .ObjectType
                .GetProperty(_propertyName);

            if (valueType != objectProperty.PropertyType)
            {
                throw new InvalidOperationException("The property types does not match.");
            }

            var propertyValue = objectProperty.GetValue(validationContext.ObjectInstance);

            return validator.Invoke(value, propertyValue)
                ? ValidationResult.Success
                : new ValidationResult($"The value of ${validationContext.MemberName} property is not valid.");


        }


    }
}
