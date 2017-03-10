namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removeSectionForeignKey : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.MenuItems", new[] { "SectionID" });
            CreateIndex("dbo.MenuItems", "SectionID");
        }
        
        public override void Down()
        {
            DropIndex("dbo.MenuItems", new[] { "SectionID" });
            CreateIndex("dbo.MenuItems", "SectionID");
        }
    }
}
