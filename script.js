// Get all the necessary elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const playButton = player.querySelector('.player__button');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackSpeedSlider = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

// Function to toggle play/pause of the video
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Function to update the play/pause button icon
function updatePlayButtonIcon() {
    playButton.textContent = video.paused ? '►' : '❚ ❚';
}

// Function to handle skip buttons
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Function to handle volume change
function handleVolumeChange() {
    video.volume = volumeSlider.value;
}

// Function to handle playback speed change
function handlePlaybackSpeedChange() {
    video.playbackRate = playbackSpeedSlider.value;
}

// Function to handle progress update
function handleProgressUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

// Function to handle scrubbing progress
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Add event listeners
video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButtonIcon);
video.addEventListener('pause', updatePlayButtonIcon);
video.addEventListener('timeupdate', handleProgressUpdate);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSlider.addEventListener('input', handlePlaybackSpeedChange);
skipButtons.forEach(button => button.addEventListener('click', skip));
progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

// Set initial playback speed
video.playbackRate = playbackSpeedSlider.value;

// Set initial volume
video.volume = volumeSlider.value;