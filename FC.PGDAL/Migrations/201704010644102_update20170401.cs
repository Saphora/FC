namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update20170401 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UGenres", "ArchiveDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UGenres", "ArchiveDate", c => c.DateTime(nullable: false));
        }
    }
}
