/**
 * apply_hashes_module.js
 * Client-side safe module to read injected meta hashes and EmailJS service IDs.
 * Does NOT contain any secrets. It only reads meta tags injected into index.html.
 */

window.STLUDHIS = (function(){
  function meta(name){
    try{
      var el = document.querySelector('meta[name="'+name+'"]');
      return el ? el.getAttribute('content') : null;
    }catch(e){
      return null;
    }
  }

  return {
    getHashes: function(){
      return {
        user: meta('n4j1bw4h1du554l4m'),
        dev: meta('XXXn4j1b54l4m'),
        backup: meta('stlbackup')
      };
    },
    getEmailServices: function(){
      return {
        primary: meta('service_ond1bqz'),
        developer: meta('service_xtt8prj'),
        education: meta('service_s82nwco')
      };
    },
    debug: function(){
      console.group('STLUDHIS meta debug');
      console.log('userHash', meta('stl-pass-user'));
      console.log('devHash', meta('stl-pass-dev'));
      console.log('backupHash', meta('stl-pass-backup'));
      console.log('emailPrimary', meta('stl-email-primary'));
      console.log('emailDeveloper', meta('stl-email-developer'));
      console.log('emailEducation', meta('stl-email-education'));
      console.groupEnd();
    }
  };
})();
