using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace LngChat.WebAPI.ModelBinders
{
    public class JsonArrayModelBinder : IModelBinder
    {
        public async Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var model = Activator.CreateInstance(bindingContext.ModelType);

            foreach(var property in bindingContext.ModelType.GetProperties())
            {
                if(!bindingContext.HttpContext.Request.Query.TryGetValue(property.Name, out var queryValue) 
                    || !queryValue.Any())
                {
                    continue;
                }

                object propertyValue;
                if (property.PropertyType.IsArray)
                {
                    propertyValue = JsonConvert.DeserializeObject(queryValue[0], property.PropertyType);
                }
                else
                {
                    var valueConverter = TypeDescriptor.GetConverter(property.PropertyType);
                    if (!valueConverter.CanConvertFrom(typeof(string)))
                    {
                        continue;
                    }

                    propertyValue = valueConverter.ConvertFromString(queryValue[0]);
                }

                property.SetValue(model, propertyValue);
            }

            bindingContext.Result = ModelBindingResult.Success(model);
        }
    }
}
