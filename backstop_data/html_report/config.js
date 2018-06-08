report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "test": "../bitmaps_test/20180607-232600/backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:3000",
        "referenceUrl": "http://demo-cji5eriwo00ok0lgzdptx7tdn.apostrophecms.org",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": -84,
            "height": -1857
          },
          "misMatchPercentage": "16.57",
          "analysisTime": 213
        },
        "diffImage": "../bitmaps_test/20180607-232600/failed_diff_backstop_default_BackstopJS_Homepage_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "test": "../bitmaps_test/20180607-232600/backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:3000",
        "referenceUrl": "http://demo-cji5eriwo00ok0lgzdptx7tdn.apostrophecms.org",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -1628
          },
          "misMatchPercentage": "38.22",
          "analysisTime": 648
        },
        "diffImage": "../bitmaps_test/20180607-232600/failed_diff_backstop_default_BackstopJS_Homepage_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});