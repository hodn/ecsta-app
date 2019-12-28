let UserProfile = (function() {
    let username = "";
    let userId = "";
  
    const getName = function() {
      return username;    // Or pull this from cookie/localStorage
    };

    const getId = function() {
        return userId;    // Or pull this from cookie/localStorage
      };
  
    const setName = function(name) {
      username = name;     
      // Also set this in cookie/localStorage
    };

    const setId = function(id) {
        userId = IDBIndex;     
        // Also set this in cookie/localStorage
      };
  
    return {
      getName: getName,
      setName: setName,
      getId: getId,
      setId: setId
    }
  
  })();
  
  export default UserProfile;