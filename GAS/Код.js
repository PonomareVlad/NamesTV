function doGet() {
    return downloadPresentation('1u5XbVwXb5uhIyp7GOgAUon3bqej6vm5hwzCZzCUZEbM')
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