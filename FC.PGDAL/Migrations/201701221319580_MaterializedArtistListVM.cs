namespace FC.PGDAL.Migrations
{
    using Shared.Config;
    using System;
    using System.Data.Entity.Migrations;

    public partial class MaterializedArtistListVM : DbMigration
    {
        public override void Up()
        {
            this.Sql("DROP MATERIALIZED VIEW dbo.\"MaterializedArtistListVMs\"");
            this.SqlFile(FCConfig.SQL_FILE_ROOT + "/Views/ArtistListVM.sql");
        }

        public override void Down()
        {
            this.Sql("DROP MATERIALIZED VIEW dbo.\"MaterializedArtistListVMs\"");
        }
    }
}
