var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();

var allTrackers = new
{
    trackers = new object[]
    {
        new { id = 547617, name = "seven-group.pro" },
        new { id = 7031733, name = "onder.tech" },
    }
};

app.MapGet("/api/v1/trackers", () => allTrackers);

app.MapGet("/api/v2/worklog", async context =>
{
    using var httpClient = new HttpClient();

    var reqMsg = new HttpRequestMessage(HttpMethod.Get,
        "https://api.tracker.yandex.net/v2/worklog" + context.Request.QueryString);

    reqMsg.Headers.Add("Authorization", context.Request.Headers["Authorization"].SingleOrDefault());
    reqMsg.Headers.Add("X-Org-ID", context.Request.Headers["X-Org-ID"].SingleOrDefault());

    var resp = await httpClient.SendAsync(reqMsg);
    var respBody = await resp.Content.ReadAsStringAsync();

    context.Response.StatusCode = (int)resp.StatusCode;
    await context.Response.WriteAsync(respBody);
});

app.MapFallbackToFile("index.html");

app.Run();
