namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    public partial class ISortable_DeletedPublished : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Media", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.ApplicationUsers", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.ApplicationUsers", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Locations", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Tickets", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Stages", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Stages", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Products", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Resellers", "IsPublished", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Resellers", "IsPublished");
            DropColumn("dbo.Products", "IsPublished");
            DropColumn("dbo.Stages", "IsPublished");
            DropColumn("dbo.Stages", "Deleted");
            DropColumn("dbo.Tickets", "IsPublished");
            DropColumn("dbo.Locations", "IsPublished");
            DropColumn("dbo.ApplicationUsers", "Deleted");
            DropColumn("dbo.ApplicationUsers", "IsPublished");
            DropColumn("dbo.Media", "IsPublished");
        }
    }
}
