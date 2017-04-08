using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Helpers
{
    public class MemReg : IDisposable
    {
        private static MemReg _inst { get; set; }
        private Dictionary<string,dynamic> _registry { get; set; }
        public static MemReg GetInstance()
        {
            if (_inst == null)
            {
                _inst = new MemReg();
            }
            return _inst;
        }
        private MemReg()
        {
            _registry = new Dictionary<string, dynamic>();
        }

        public object Get(string key)
        {
            if (_registry.Keys.Contains(key))
            {
                if (_registry[key] != null)
                {
                    var result = _registry[key];
                    _registry.Remove(key);
                    return result;
                }
                else
                {
                    return null;
                }
            } else
            {
                return null;
            }
        }

        public void Set(string key, dynamic value)
        {
            if (!_registry.Keys.Contains(key))
            {
                _registry[key] = value;
            }
        }

        public void Remove(string key)
        {
            _registry.Remove(key);
        }

        
        public void Dispose()
        {
            this.Clear();
            _inst = null;
        }

        public void Clear()
        {
            string[] keys = _registry.Keys.ToArray();
            foreach(string key in keys)
            {
                _registry.Remove(key);
            }
        }
    }
}
