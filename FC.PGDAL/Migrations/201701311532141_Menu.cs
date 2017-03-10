namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Menu : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MenuItems",
                c => new
                    {
                        MenuItemID = c.Guid(nullable: false),
                        ParentID = c.Guid(),
                        OpositeID = c.Guid(),
                        SortOrder = c.Int(nullable: false),
                        FAIcon = c.String(),
                        Title = c.String(),
                        URL = c.String(),
                        OnClick = c.String(),
                        IsSpecific = c.Boolean(nullable: false),
                        SectionID = c.Guid(),
                        Name = c.String(),
                        Deleted = c.Boolean(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.MenuItemID)
                .ForeignKey("dbo.MenuSections", t => t.SectionID)
                .Index(t => t.SectionID);
            
            CreateTable(
                "dbo.MenuSections",
                c => new
                    {
                        SectionID = c.Guid(nullable: false),
                        Name = c.String(),
                        FAIcon = c.String(),
                        SortOrder = c.Int(nullable: false),
                        PageKey = c.String(),
                        Deleted = c.Boolean(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.SectionID)
                .Index(t => t.PageKey);
            
            CreateTable(
                "dbo.MenuSection2Roles",
                c => new
                    {
                        MS2RID = c.Guid(nullable: false),
                        RoleID = c.Guid(),
                        MenuSectionID = c.Guid(),
                    })
                .PrimaryKey(t => t.MS2RID)
                .ForeignKey("dbo.Roles", t => t.RoleID)
                .ForeignKey("dbo.MenuSections", t => t.MenuSectionID)
                .Index(t => t.RoleID)
                .Index(t => t.MenuSectionID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MenuSection2Roles", "MenuSectionID", "dbo.MenuSections");
            DropForeignKey("dbo.MenuSection2Roles", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.MenuItems", "SectionID", "dbo.MenuSections");
            DropIndex("dbo.MenuSection2Roles", new[] { "MenuSectionID" });
            DropIndex("dbo.MenuSection2Roles", new[] { "RoleID" });
            DropIndex("dbo.MenuSections", new[] { "PageKey" });
            DropIndex("dbo.MenuItems", new[] { "SectionID" });
            DropTable("dbo.MenuSection2Roles");
            DropTable("dbo.MenuSections");
            DropTable("dbo.MenuItems");
        }
    }
}
