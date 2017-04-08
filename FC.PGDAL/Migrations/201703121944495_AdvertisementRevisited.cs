namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdvertisementRevisited : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Advertisements", "Description", c => c.String());
            AddColumn("dbo.Advertisements", "HTMLString", c => c.String());
            AddColumn("dbo.Advertisements", "CSSString", c => c.String());
            AddColumn("dbo.Advertisements", "JSString", c => c.String());
            AddColumn("dbo.Advertisements", "MetaKeys", c => c.String());
            AddColumn("dbo.Advertisements", "MetaDescription", c => c.String());
            AddColumn("dbo.Advertisements", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.Advertisements", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Advertisements", "URL", c => c.String());
            AddColumn("dbo.Advertisements", "ArchiveDate", c => c.DateTime());
            AddColumn("dbo.Advertisements", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.Advertisements", "DeleteDate", c => c.DateTime());
            AddColumn("dbo.Advertisements", "Deleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Advertisements", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Advertisements", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Advertisements", "Name", c => c.String());
            AlterColumn("dbo.Advertisements", "Created", c => c.DateTime());
            AlterColumn("dbo.Advertisements", "Modified", c => c.DateTime());
            AlterColumn("dbo.Advertisements", "Expires", c => c.DateTime());
            AlterColumn("dbo.Advertisements", "PublishDate", c => c.DateTime());
            CreateIndex("dbo.Advertisements", "ResellerID");
            CreateIndex("dbo.Advertisements", "Expires");
            CreateIndex("dbo.Advertisements", "PublishDate");
            AddForeignKey("dbo.Advertisements", "ResellerID", "dbo.Resellers", "ResellerID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Advertisements", "ResellerID", "dbo.Resellers");
            DropIndex("dbo.Advertisements", new[] { "PublishDate" });
            DropIndex("dbo.Advertisements", new[] { "Expires" });
            DropIndex("dbo.Advertisements", new[] { "ResellerID" });
            AlterColumn("dbo.Advertisements", "PublishDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Advertisements", "Expires", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Advertisements", "Modified", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Advertisements", "Created", c => c.DateTime(nullable: false));
            DropColumn("dbo.Advertisements", "Name");
            DropColumn("dbo.Advertisements", "IsActive");
            DropColumn("dbo.Advertisements", "IsDeleted");
            DropColumn("dbo.Advertisements", "Deleted");
            DropColumn("dbo.Advertisements", "DeleteDate");
            DropColumn("dbo.Advertisements", "CreatedDate");
            DropColumn("dbo.Advertisements", "ArchiveDate");
            DropColumn("dbo.Advertisements", "URL");
            DropColumn("dbo.Advertisements", "SortOrder");
            DropColumn("dbo.Advertisements", "ModifiedDate");
            DropColumn("dbo.Advertisements", "MetaDescription");
            DropColumn("dbo.Advertisements", "MetaKeys");
            DropColumn("dbo.Advertisements", "JSString");
            DropColumn("dbo.Advertisements", "CSSString");
            DropColumn("dbo.Advertisements", "HTMLString");
            DropColumn("dbo.Advertisements", "Description");
        }
    }
}
