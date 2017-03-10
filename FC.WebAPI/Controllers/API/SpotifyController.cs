using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using FC.Shared.Umbraco;
using FC.Interfaces.Utils;
using FC.Shared.EntityMapper;



namespace FC.WebAPI.Controllers.API
{
    //clientid: cce00b33252d4acc80a0b777a8d88d2d
    //clientSecret: 19f07fdf93624b8e810b563cb16f6fc9

    public class SpotifyController : BaseAPIController
    {
        ///https://accounts.spotify.com/nl/authorize?client_id=cce00b33252d4acc80a0b777a8d88d2d&response_type=code&redirect_uri=http:%2F%2Flocalhost:8213%2Fumbraco%2FAPI%2FSpotify%2FCallback&state=test&scope=user-read-private%20user-read-email&show_dialog=true
        [HttpGet]
        public string Callback(string state)
        {
            return state;
        }
        public string Auth()
        {
            return "";
        }

        private void GeneratePlaylist(int festivalID)
        {

        }
        public object GetPlaylist(int festivalID)
        {
            return null;
        }

        public object ShufflePlaylist(int festivalID)
        {
            return null;
        }

    }
}
