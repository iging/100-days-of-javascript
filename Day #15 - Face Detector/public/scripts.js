console.log(faceapi);

const run = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const videoFeedEl = document.getElementById("video-feed");
  videoFeedEl.srcObject = stream;

  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.ageGenderNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models"),
  ]);

  const canvas = document.getElementById("canvas");
  canvas.style.left = videoFeedEl.offsetLeft;
  canvas.style.top = videoFeedEl.offsetTop;
  canvas.height = videoFeedEl.height;
  canvas.width = videoFeedEl.width;

  const refFace = await faceapi.fetchImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/220px-Michael_Jordan_in_2014.jpg"
  );

  let refFaceAiData = await faceapi
    .detectAllFaces(refFace)
    .withFaceLandmarks()
    .withFaceDescriptors();
  let faceMatcher = new faceapi.FaceMatcher(refFaceAiData);

  setInterval(async () => {
    let faceAIData = await faceapi
      .detectAllFaces(videoFeedEl)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender()
      .withFaceExpressions();

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceAIData = faceapi.resizeResults(faceAIData, videoFeedEl);
    faceapi.draw.drawDetections(canvas, faceAIData);
    faceapi.draw.drawFaceLandmarks(canvas, faceAIData);
    faceapi.draw.drawFaceExpressions(canvas, faceAIData);

    faceAIData.forEach((face) => {
      const { age, gender, genderProbability, detection, descriptor } = face;
      const genderText = `${gender} - ${
        (Math.round(genderProbability * 100) / 100) * 100
      }`;
      const ageText = `${Math.round(age)} years`;
      const textField = new faceapi.draw.DrawTextField(
        [genderText, ageText],
        face.detection.box.topRight
      );
      textField.draw(canvas);

      let label = faceMatcher.findBestMatch(descriptor).toString();
      let options = { label: "Jordan" };
      if (label.includes("unknown")) {
        options = { label: "Unknown subject..." };
      }
      const drawBox = new faceapi.draw.DrawBox(detection.box, options);
      drawBox.draw(canvas);
    });
  }, 200);
};

run();
