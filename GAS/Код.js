function doGet() {
    return downloadPresentation('1JE76NDmkOx7aDwSN8627GaihHMU_2jNvb8idvU3zM9o')
}

function downloadPresentation(id) {
    // var slideIds = getSlideIds(id);

    var presentation = SlidesApp.openById(id);

    var slides = presentation.getSlides().map(function (slide) {
        var thumbnail = Slides.Presentations.Pages.getThumbnail(id, slide.getObjectId(), {
            'thumbnailProperties.thumbnailSize': 'LARGE'
        });
        return thumbnail.contentUrl;//'https://docs.google.com/presentation/d/' + id + '/export/png?id=' + id + '&pageid=' + slide.getObjectId()
    });

    /*return slideData.slides.map(function(slide) {
      return slide.objectId;
    });*/

    /*for (var i = 0, slideId; slideId = slideIds[i]; i++) {
        downloadSlide('Slide ' + (i + 1), id, slideId);
    }*/

    return ContentService.createTextOutput(JSON.stringify(slides)).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// https://docs.google.com/presentation/d/1JE76NDmkOx7aDwSN8627GaihHMU_2jNvb8idvU3zM9o/export/png?id=1JE76NDmkOx7aDwSN8627GaihHMU_2jNvb8idvU3zM9o&pageid=g85f6c706a4_0_45

function downloadSlide(name, presentationId, slideId) {
    var url = 'https://docs.google.com/presentation/d/' + presentationId +
        '/export/png?id=' + presentationId + '&pageid=' + slideId;
    return url
    var options = {
        headers: {
            Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
        }
    };
    //var response = UrlFetchApp.fetch(url, options);
    //var image = response.getAs(MimeType.PNG);
    //image.setName(name);
    //DriveApp.createFile(image);
    var response = UrlFetchApp.fetch(url, options);
    var blob = response.getBlob();
    blob.setName(name + '.png');
    var file = DriveApp.createFile(blob);
    Logger.log('Created file "%s"', file.getName());
}

function getSlideIds(presentationId) {
    var url = 'https://slides.googleapis.com/v1/presentations/' + presentationId;
    var options = {
        headers: {
            Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
        }
    };
    var response = UrlFetchApp.fetch(url, options);

    var slideData = JSON.parse(response);
    return slideData.slides.map(function (slide) {
        return slide.objectId;
    });
}

function exportSlideImages(presentationId) {
    var presentation = SlidesApp.openById(presentationId);
    presentation.getSlides().forEach(function (slide, i) {
        // slide = presentation.getSlides()[];
        var thumbnail = Slides.Presentations.Pages.getThumbnail(presentationId, slide.getObjectId(), {
            'thumbnailProperties.thumbnailSize': 'LARGE'
        });
        var response = UrlFetchApp.fetch(thumbnail.contentUrl);
        var blob = response.getBlob();
        blob.setName('slide' + (i + 1) + '.png');
        var file = DriveApp.createFile(blob);
        Logger.log('Created file "%s" for slide number %s', file.getName(), i + 1);
    });
}