function doGet(e) {
    if (!e.parameter.id) return false;
    return downloadPresentation(e.parameter.id);
}

function downloadPresentation(id) {
    var presentation = SlidesApp.openById(id);
    var slides = presentation.getSlides().map(function (slide) {
        var thumbnail = Slides.Presentations.Pages.getThumbnail(id, slide.getObjectId(), {
            'thumbnailProperties.thumbnailSize': 'LARGE'
        });
        return thumbnail.contentUrl;
    });
    return ContentService.createTextOutput(JSON.stringify(slides)).setMimeType(ContentService.MimeType.JAVASCRIPT);
}