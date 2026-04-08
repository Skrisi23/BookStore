using System.Configuration;

namespace God.Support.mode.Services;

public class SettingsService
{
    public string ApiBaseUrl
    {
        get => ConfigurationManager.AppSettings["ApiBaseUrl"] ?? "http://localhost:5041";
        set => UpdateSetting("ApiBaseUrl", value);
    }

    public int AdminUserId
    {
        get => int.TryParse(ConfigurationManager.AppSettings["AdminUserId"], out var id) ? id : 1;
        set => UpdateSetting("AdminUserId", value.ToString());
    }

    public bool IsDarkTheme
    {
        get => !string.Equals(ConfigurationManager.AppSettings["Theme"], "Light", StringComparison.OrdinalIgnoreCase);
        set => UpdateSetting("Theme", value ? "Dark" : "Light");
    }

    private static void UpdateSetting(string key, string value)
    {
        var config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
        if (config.AppSettings.Settings[key] != null)
            config.AppSettings.Settings[key].Value = value;
        else
            config.AppSettings.Settings.Add(key, value);
        config.Save(ConfigurationSaveMode.Modified);
        ConfigurationManager.RefreshSection("appSettings");
    }
}
