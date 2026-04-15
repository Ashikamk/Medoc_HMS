using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EUMI_ERP.Startup))]
namespace EUMI_ERP
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
