using System;

namespace LngChat.WebAPI.Settings
{
    public class DatabaseConfiguration
    {
        public string ConnectionString { get; set; }

        public Version ServerVersion { get; set; }
    }
}
