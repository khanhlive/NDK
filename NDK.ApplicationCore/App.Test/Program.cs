using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NDK.ApplicationCore.Encrypt;

namespace App.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            EncryptorRSAKeys key = EncryptorRSA.GenerateKeys(2048);
            string input = "";
            input = Console.ReadLine();
            string str = EncryptorRSA.EncryptText(input, key.PublicKey);
            Console.WriteLine("encrypt: "+str);
            Console.WriteLine("decrypt: " + EncryptorRSA.DecryptText(str,key.PrivateKey));
            Console.WriteLine(EncryptorRSA.GetMaxDataLength(16384));
            Console.ReadKey();
        }
    }
}
