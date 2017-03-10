namespace FC.PGDAL.Migrations
{
    using Shared.Config;
    using System;
    using System.Data.Entity.Migrations;

    public partial class FestivalListMaterialized : DbMigration
    {
        public override void Up()
        {
            this.SqlFile(FCConfig.SQL_FILE_ROOT + "/Views/FestivalListVM.sql");
        }
        
        public override void Down()
        {
            this.Sql("DROP MATERIALIZED VIEW dbo.\"MaterializedFestivalListVMs\"");
        }
    }
}
