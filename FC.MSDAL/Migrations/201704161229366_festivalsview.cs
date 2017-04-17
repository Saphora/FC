namespace FC.MSDAL.Migrations
{
    using Shared.Config;
    using System;
    using System.Data.Entity.Migrations;

    public partial class festivalsview : DbMigration
    {
        public override void Up()
        {
            SqlFile(FCConfig.SQL_FILE_ROOT + "view_dbo_festivals.sql");
        }

        public override void Down()
        {
            Sql("DROP VIEW dbo.[MaterializedFestivals]");
        }
    }
}
