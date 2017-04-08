namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update20170329 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.UNews", new[] { "AuthorID" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.UNews", "AuthorID");
        }
    }
}
