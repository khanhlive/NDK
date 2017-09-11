using System.Web;
using System.Web.Optimization;

namespace ICB_Website.UI
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/font-awesome.min.css",
                "~/Content/bootstrap.min.css",
                "~/Content/magnific-popup.css",
                "~/Content/megafish.css",
                "~/Content/mega-menu.css",
                "~/Content/flexslider.css",
                "~/Content/owl.carousel.css",
                "~/Content/owl.theme.css",
                "~/Plugins/fotorama-4.6.4/fotorama.css",
                "~/Content/jquery.mCustomScrollbar.css",
                "~/Content/xmax-theme.css",
                "~/Content/responsive.css",
                "~/Scripts/mediaelement/knd-mediaelement.css",
                "~/Content/icb-style.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/Scripts/js").Include(
                "~/Plugins/themes/comment-reply.js",
                "~/Scripts/bootstrap.min.js",
                "~/Plugins/themes/modernizr.js",
                "~/Plugins/fotorama-4.6.4/fotorama.js",
                "~/Plugins/OwlCarousel2/owl.carousel.min.js",
                "~/Plugins/themes/knd-embed.js",
                "~/Scripts/underscore.min.js",
                "~/Plugins/themes/knd-util.js",
                "~/Scripts/backbone.min.js",
                "~/Scripts/mediaelement/mediaelement-and-player.min.js",
                "~/Plugins/themes/knd-playlist.js",
                "~/Plugins/jssor.slider.min.js",
                "~/Scripts/apps/app.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/custom").Include(
                "~/Scripts/custom/custom.js"
                ));
            BundleTable.EnableOptimizations = true;
        }
    }
}
