namespace FC.PGDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update20170301 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "CountryID", c => c.Guid());
            AddColumn("dbo.ApplicationUsers", "City", c => c.String());
            AddColumn("dbo.ApplicationUsers", "ZIPCode", c => c.String());
            AddColumn("dbo.ApplicationUsers", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.ApplicationUsers", "ModifiedDate", c => c.DateTime());
            AddColumn("dbo.ApplicationUsers", "DeletedDate", c => c.DateTime());
            AlterColumn("dbo.MediaDirectories", "ArchiveDate", c => c.DateTime());
            CreateIndex("dbo.ApplicationUsers", "CountryID");
            AddForeignKey("dbo.ApplicationUsers", "CountryID", "dbo.UCountries", "CountryID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ApplicationUsers", "CountryID", "dbo.UCountries");
            DropIndex("dbo.ApplicationUsers", new[] { "CountryID" });
            AlterColumn("dbo.MediaDirectories", "ArchiveDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.ApplicationUsers", "DeletedDate");
            DropColumn("dbo.ApplicationUsers", "ModifiedDate");
            DropColumn("dbo.ApplicationUsers", "CreatedDate");
            DropColumn("dbo.ApplicationUsers", "ZIPCode");
            DropColumn("dbo.ApplicationUsers", "City");
            DropColumn("dbo.ApplicationUsers", "CountryID");
        }
    }
}
