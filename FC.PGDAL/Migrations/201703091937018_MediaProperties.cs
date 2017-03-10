namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MediaProperties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Media", "CropImage", c => c.Boolean(nullable: false));
            AddColumn("dbo.Media", "X", c => c.String());
            AddColumn("dbo.Media", "Y", c => c.String());
            AddColumn("dbo.Media", "CssString", c => c.String());
            AddColumn("dbo.Media", "HtmlString", c => c.String());
            AlterColumn("dbo.Media", "Width", c => c.String());
            AlterColumn("dbo.Media", "Height", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Media", "Height", c => c.Int(nullable: false));
            AlterColumn("dbo.Media", "Width", c => c.Int(nullable: false));
            DropColumn("dbo.Media", "HtmlString");
            DropColumn("dbo.Media", "CssString");
            DropColumn("dbo.Media", "Y");
            DropColumn("dbo.Media", "X");
            DropColumn("dbo.Media", "CropImage");
        }
    }
}
