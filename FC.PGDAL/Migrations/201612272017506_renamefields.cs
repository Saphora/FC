namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renamefields : DbMigration
    {
        public override void Up()
        {
            //AddColumn("dbo.MaterializedArtistListVMs", "IsPublished", c => c.Boolean(nullable: false));
            //DropColumn("dbo.MaterializedArtistListVMs", "IsPublised");
        }
        
        public override void Down()
        {
        //    AddColumn("dbo.MaterializedArtistListVMs", "IsPublised", c => c.Boolean(nullable: false));
        //    DropColumn("dbo.MaterializedArtistListVMs", "IsPublished");
        }
    }
}
