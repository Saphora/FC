namespace FC.PGDAL.Migrations
{
    using Shared.Config;
    using System;
    using System.Data.Entity.Migrations;

    public partial class MaterializedNews : DbMigration
    {
        public override void Up()
        {
            this.SqlFile(FCConfig.SQL_FILE_ROOT + "/Views/MaterializedNews.sql");
            this.SqlFile(FCConfig.SQL_FILE_ROOT + "/Views/Triggers.sql");
        }

        public override void Down()
        {
            this.Sql("DROP MATERIALIZED VIEW dbo.\"MaterializedNews\"");
        }
    }
}
