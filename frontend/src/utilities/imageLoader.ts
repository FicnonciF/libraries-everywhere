const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

// Pass the folder path, a boolean for whether to look in subdirectories, and a regex for file extensions
const images = importAll(require.context('@/assets/contributors', false, /\.(png|jpe?g|svg)$/));

export default images;