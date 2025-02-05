using DataAcess.DBAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAcess.Exceptions;
using System.Data.SqlClient;
using System.Transactions;

namespace DataAcess.Data
{
    public class SettingsData : ISettingsData
    {
        private readonly ISqlDataAccess _db;
        private bool _loggedIn;
        private int _currentRandomNumber;
        public SettingsData(ISqlDataAccess db) 
        { 
            _db = db;
            _loggedIn = false;
            _currentRandomNumber = -1;
        }

        public async Task ChangePassword(string oldPass, string newPass)
        {
            if (!_loggedIn)
                throw new LoginException("login before change password");
            try
            {
                oldPass = Encrypt(oldPass);
                newPass = Encrypt(newPass);
                await _db.ExecuteData("UpdatePassword", new { oldPass, newPass });
            }
            catch (SqlException)
            {
                _loggedIn = false;
                throw;
            }
        }

        public string Decrypt(string encryptedValue)
        {
            var values = encryptedValue.Split([ 'A', 'B', 'C', 'D', 'E', 'F' ]);
            string decrypedValue = string.Empty;
            foreach (var value in values) 
            {
                if (value.Length == 0)
                    continue;
                int x = int.Parse(value);
                decrypedValue += $"{(char)(x / 13)}";
            }
            return decrypedValue;
        }

        public async Task EditConfig(Dictionary<string, string> configs)
        {
            try
            {
                foreach (var (attribute, value) in configs)
                {
                    await _db.ExecuteData("UpdateSettings", new { attribute, value });
                }
            }
            catch (SqlException)
            {
                throw;
            }
        }

        private char HexaEncryptionSeperator()
        {
            char[] HexaChars = ['A', 'B', 'C', 'D','E','F'];
            return HexaChars[(++_currentRandomNumber) % HexaChars.Length];
        }
            

        public string Encrypt(string value)
        {
            int encUnit = 13; // any prime number
            string encryptedValue = string.Empty;

            //reset to preserve the encryption pattern or encrypted values will not match
            _currentRandomNumber = -1;

            foreach(char c in value)
            {
                encryptedValue += $"{(int)c * encUnit}{HexaEncryptionSeperator()}";
            }

            return encryptedValue;
        }

        public async Task<IEnumerable<KeyValuePair<string,string>>> LoadConfigs()
        {
            var data = (await _db.LoadData<(string attribute, string value), dynamic>("LoadSettings", new { })).ToDictionary();

            _loggedIn = data["status"] == "logged in";

            return data;
        }

        public async Task Login(string username, string password)
        {
            try
            {
                password = Encrypt(password);
                await _db.ExecuteData("userLogin", new { username, password });
                _loggedIn = true;
            }
            catch (SqlException SqlEx)
            {
                throw new LoginException($"Failed to login: {SqlEx.Message}");
            }
        }

        public async Task Logout()
        {
            try
            {
                await _db.ExecuteData("userLogout", new { });
                _loggedIn = false;
            }
            catch (SqlException SqlEx)
            {
                throw new LoginException($"Failed to logout: {SqlEx.Message}");
            }
        }
    }
}
