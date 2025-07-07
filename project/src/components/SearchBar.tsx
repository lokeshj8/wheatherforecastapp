import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onGetLocation: () => void;
  loading: boolean;
  gettingLocation: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onGetLocation, loading, gettingLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl p-2 transition-all duration-300"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-white" />
          )}
        </button>
      </form>
      
      <button
        onClick={onGetLocation}
        disabled={gettingLocation || loading}
        className="w-full mt-4 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-lg rounded-2xl border border-white/30 text-white py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-300"
      >
        {gettingLocation ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <MapPin className="w-5 h-5" />
        )}
        <span>{gettingLocation ? 'Getting location...' : 'Use my location'}</span>
      </button>
    </div>
  );
};

export default SearchBar;