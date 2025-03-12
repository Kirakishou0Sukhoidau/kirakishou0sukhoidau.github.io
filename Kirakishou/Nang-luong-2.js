 //thanh tim kiem   
    function handleSearch(formId) {
  const input = document.getElementById(`input-${formId}`);
  const searchEngine = document.getElementById(`search-engine-${formId}`);
  const submitButton = document.getElementById(`submit-${formId}`);


    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
      const query = input.value.trim();
      if (query === "") {
        return;
      }
      
      const selectedEngine = searchEngine.value;
      let url = "";
      switch (selectedEngine) {
        case "duckduckgo":
          url = "https://duckduckgo.com/?q=" + query;
          break;
        case "google":
          url = "https://www.google.com/search?q=" + query;
          break;
       case "google-img":
          url = "https://www.google.com/search?q=" + query + "&udm=2";
          break;
        case "rule34":
           url = "https://www.rule34.xxx/index.php?page=post&s=list&tags=" + query;
 break;
         case "zerochan":        
         url = "https://www.zerochan.net/search?q=" + query;
          break;
              case "danbooru":        
         url = "https://danbooru.donmai.us/posts?tags=" + query;
          break;
          case "pixiv-r18":
          url = "https://www.pixiv.net/en/tags/" + query + "/artworks?mode=r18";
          break;
           case "font-awesome":
          url = "https://fontawesome.com/search?q=" + query + "&o=r&m=free";
          break;
          case "cardyugioh":
          url = "https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=1&sess=1&rp=10&mode=&sort=1&keyword=" + query + "&stype=1&ctype=&othercon=2&starfr=&starto=&pscalefr=&pscaleto=&linkmarkerfr=&linkmarkerto=&link_m=2&atkfr=&atkto=&deffr=&defto=&releaseDStart=1&releaseMStart=1&releaseYStart=1999&releaseDEnd=&releaseMEnd=&releaseYEnd=";
          break;
          case "pixiv":
          url = "https://www.pixiv.net/en/tags/" + query;
          break;
          case "wikipedia":
          url = "https://vi.m.wikipedia.org/wiki/" + query;
          break;
         case "bing":
          url = "https://www.bing.com/search?q=" + query;
          break;
          case "googlev":
          url = "https://transparencyreport.google.com/safe-browsing/search?url=" + query;
          break;
          case "yandere":
          url = "https://yande.re/post?tags=" + query;
          break;
          case "itemtoram":
          url = "https://coryn.club/item.php?name=" + query;
          break;
           case "quaitoram":
          url = "https://coryn.club/monster.php?name=" + query;
          break;
           case "lvltoram":
          url = "https://coryn.club/leveling.php?lv=" + query + "&gap=7";
          break;
           case "maptoram":
          url = "https://coryn.club/map.php?name=" + query;
          break;
           case "nct":
          url = "https://www.nhaccuatui.com/tim-kiem?q=" + query;
          break;
           case "zing-mp3":
          url = "https://zingmp3.vn/tim-kiem/tat-ca?q=" + query;
          break;
           case "ytb":
          url = "https://youtube.com/results?sp=mAEA&search_query=" + query;
          break;
        case "qtm":
          url = "https://quantrimang.com/s/?q=" + query;
          break;
          case "fd":
          url = "https://" + query + ".fandom.com/";
          break;
          case "apkpure":
          url = "https://apkpure.com/search?q=" + query;
          break;
          case "tdwk":
          url = "https://vi.m.wiktionary.org/wiki/" + query;
          break;
          case "checkscam":
          url = "https://scam.vn/check-website?domain=" + query;
          break;
          case "scamadviser":
          url = "https://www.scamadviser.com/check-website/" + query;
          break;
          case "urlscanio":
          url = "https://urlscan.io/domain/" + query;
          break;

    

      }
  window.open(url, '_blank');
  //mo-o-mot trang
   /*window.location.href = url;*/
    });}

  handleSearch("search");
handleSearch("quet");


//bang-feed
let subreddits = ["hentai", "rule34", "rape_hentai", "HentaiForcedOrgasms", "HENTAI_GIF", "HelplessHentai", "hentaibondage", "CumHentai", "AiUncensored", "Hentai__videos", "onepiecehentaiz", "HentaiAnal", "AnalHentai", "WonderWomanNSFW", "FrierenNSFW", "Frieren_NSFW", "FrierenHentaiAI", 
                  "guro", "HardcoreHentaiBondage", "futanari", "quick_hentai", "yurigif", "YuriHentai", "yuri", "OralHentai", "HentaiAnaru", "MasturbationHentai", "MonsterGirl", "AraAra", "HentaiAndRoleplayy", "hentainmanga", "MikuNakanoNSFW", "NSFW_GIF", "AnimeWallpaperNSFW", "Hentai_AnimeNSFW", "nsfwanimegifs", 
                  "GenshinImpactHentai", "GenshinImpactNSFW", "HentaiMini2", "Kurumitokisakihentai", "GuraLewdz", "hentai_sex_videos_hub", "hentaipower", "ElfHentai", "groupsexhentai", "awesomePublicNudity", "punchingslappingbdsm", "bdsm", "HumiliationBDSM", "HentaiTrade_N_Feed", "Short_Hentai", "AnimeTitties", 
                  "yuriMILFs", "Rule_34", "rule34aiart", "Rule34LoL", "yugioh_nsfw", "JerkOffToAnime", "Nekomimi", "NekoHentai", "FairyTail_R34", "AIExpansionHentai", "HentaiReverseRape2", "AnimeH34", "swimsuithentai", "orgasmcontrol", "Orgasms", "OralPleasure", "Hentai__videos", "hentaichannel",
                  "HentaiPetgirls", "saohentai", "HentaiVTuberGirls", "ecchi", "MaidHentai", "DragonMaidNSFW", "hatsunemikuhentaiv3", "ReZeroHentai", "Naruto_Hentai", "pixxx_naruto", "Naruto_AI", "FemboyRape", "FemboyHentai", "XrayHentai", "jerkbudsHentai", "QoS_Hentai_and_RP", "BlackedHentaiandRP", 
                  "BluearchiveNSFW", "animeplot", "recommendhanime", "Touhou_NSFW", "PantiesHentai", "MiSideR34", "OshiNoKo_Hentai", "oshinokonsfw", "DCNSFW", "SpreadingHentai", "Shinobuhentai", "WelcometohentaiIruma", "AnimeSeeThrough", "QuintupletsHentai", "masteruwuoficial", "pantsu", "AlyaNSFW", "Alya_sanNsfw", 
                 "PublicSexPorn", "Bondage", "2Booty", "tentaclesex", "TentacleRoleplay", "Tentai", "Allthewaythrough", "cumflation", "WutheringWavesHentai", "CartoonPorn", "HentaiiGooning", "lesbianhentai3", "HentaiTrade_N_Feed"]; // Thêm nhiều subreddit
    

let aftersReddit = {};
let currentSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
let loading = false;

// Hàm xáo trộn bài viết
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

// Lazy Load ảnh
function lazyLoadImagesRedditfeed() {
    const imagesReddit = document.querySelectorAll(".lazy");
    const observerReddit = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observerReddit.unobserve(img);
            }
        });
    });

    imagesReddit.forEach(img => observerReddit.observe(img));
}


// Tải bài từ Reddit
async function loadRedditFeed() {
    if (loading) return;
    loading = true;

    let urlReddit = `https://www.reddit.com/r/${currentSubreddit}.json?limit=100`;
    if (aftersReddit[currentSubreddit]) urlReddit += `&after=${aftersReddit[currentSubreddit]}`;

    let res = await fetch(urlReddit);
    let data = await res.json();
    aftersReddit[currentSubreddit] = data.data.after;

    let postsReddit = data.data.children
        .filter(post => post.data.preview)
        .map(post => ({
            title: post.data.title,
            url: `https://www.reddit.com${post.data.permalink}`,
            image: post.data.preview.images[0].source.url,
            subreddit: currentSubreddit
        }));

    shuffleArray(postsReddit); // Hoán đổi vị trí bài

    let html = "";
    postsReddit.forEach(post => {
        html += `
            <div class="post">
                <small>[${post.subreddit}]</small><br>
                <a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title}</a>
                <img data-src="${post.image}" class="lazy" alt="Image" loading="lazy">
            </div>
        `;
    });

    document.getElementById("feed").innerHTML += html;
    lazyLoadImagesRedditfeed();

    loading = false;
}

// Xử lý scroll trong #feed
document.getElementById("feed").addEventListener("scroll", function () {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight - 25) {
        loadRedditFeed();
    }
});

// Reset feed - Chọn subreddit mới và xóa bài cũ
document.getElementById("reset-feed").addEventListener("click", function () {
    currentSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    document.getElementById("feed").innerHTML = "";
    aftersReddit = {}; 
    loadRedditFeed();
});

// Load lần đầu
loadRedditFeed();
      
