const clues = new Set();
        const visited = new Set();
        const interviewed = new Set();

        function showScene(scene) {
            const game = document.getElementById("game");

            if (scene === "crimeScene") {
                game.innerHTML = `
                    <h2>The Game Room</h2>
                    <p>Kessler's body lies beside the chess table. The other guests wait where you can see them. You pull on your gloves and begin.</p>
                    <p id="clueCount">Clues recorded: ${clues.size}</p>
                    <div class="choices">
                        <button onclick="investigate('Chess table')">Investigate the chess table</button>
                        <button onclick="investigate('Kessler’s body')">Examine Kessler's body</button>
                        <button onclick="investigate('Scoresheet')">Read Kessler's scoresheet</button>
                        <button onclick="showScene('home')">Leave the game room</button>
                    </div>`;
            }

            if (scene === "home") {
                game.innerHTML = `
                    <h2>Your Notepad</h2>
                    <p>You have recorded <span id="clueCount">${clues.size}</span> clue(s). The investigation is far from over.</p>
                    <h3>Choose your next move</h3>
                    <div class="choices">
                        <button onclick="showScene('interviews')">Interview the suspects</button>
                        <button onclick="showScene('rooms')">Explore the lodge</button>
                        <button onclick="showScene('evidence')">Review collected clues</button>
                        <button onclick="showScene('endingChoice')">Conclude the investigation</button>
                        <button onclick="showScene('crimeScene')">Return to the game room</button>
                    </div>`;
            }

            if (scene === "interviews") {
                game.innerHTML = `
                    <h2>Interrogate the Guests</h2>
                    <p>Everyone has a motive to conceal something. Not everyone is a murderer.</p>
                    <div class="choices">
                        <button onclick="interview('Lena Okafor')">Lena Okafor — the rival player</button>
                        <button onclick="interview('Marguerite Voss')">Marguerite Voss — the coach</button>
                        <button onclick="interview('Mr. Brandt')">Mr. Brandt — the lodge owner</button>
                        <button onclick="interview('Cass Delaney')">Cass Delaney — the journalist</button>
                        <button onclick="showScene('home')">Return to your notepad</button>
                    </div>`;
            }

            if (scene === "rooms") {
                game.innerHTML = `
                    <h2>Search the Lodge</h2>
                    <p>The blizzard rages outside. You search the rooms for evidence before the road opens.</p>
                    <div class="choices">
                        <button onclick="room('Kitchen')">Kitchen</button>
                        <button onclick="room('Conservatory')">Conservatory / greenhouse</button>
                        <button onclick="room('Wine cellar')">Wine cellar</button>
                        <button onclick="room('Library')">Library / study</button>
                        <button onclick="room('Front lobby')">Front lobby</button>
                        <button onclick="room('Kessler’s room')">Anton Kessler's room</button>
                        <button onclick="room('Lena’s room')">Lena Okafor's room</button>
                        <button onclick="room('Marguerite’s room')">Marguerite Voss's room</button>
                        <button onclick="room('Cass’s room')">Cass Delaney's room</button>
                        <button onclick="showScene('home')">Return to your notepad</button>
                    </div>`;
            }

            if (scene === "evidence") {
                const list = [...clues];
                game.innerHTML = `
                    <h2>Evidence File</h2>
                    ${list.length ? "<ul>" + list.map(c => `<li>${c}</li>`).join("") + "</ul>" : "<p>No clues recorded yet. Every detective has to start somewhere.</p>"}
                    <div class="choices">
                        <button onclick="showScene('home')">Return to your notepad</button>
                    </div>`;
            }

            if (scene === "endingChoice") {
                game.innerHTML = `
                    <h2>The Final Move</h2>
                    <p>The road may reopen soon. You must decide what to do with the evidence you have gathered.</p>
                    <div class="choices">
                        <button onclick="accuse('Marguerite Voss')">Call everyone to the game room and accuse Marguerite Voss</button>
                        <button onclick="accuse('Lena Okafor')">Accuse Lena Okafor</button>
                        <button onclick="accuse('Mr. Brandt')">Accuse Mr. Brandt</button>
                        <button onclick="showScene('sacrifice')">Keep the truth quiet — Sacrifice Play</button>
                        <button onclick="showScene('home')">I need more evidence</button>
                    </div>`;
            }

            if (scene === "sacrifice") {
                game.innerHTML = `
                    <h2>Sacrifice Play</h2>
                    <p><span class="character">You:</span> "I know what you did, Ms. Voss."</p>
                    <p><span class="character">Marguerite:</span> "Then say it. Let's be done with the pretending."</p>
                    <p><span class="character">You:</span> "I also know you didn't mean for this to happen. The road reopens tomorrow. What you do with the time before that is your business."</p>
                    <p>Marguerite stares after you, unmoving. No arrest is made. Was this a failure—or a twisted sense of justice?</p>
                    <p class="note">ENDING: SACRIFICE PLAY</p>
                    <button onclick="restart()">Play again</button>`;
            }
        }

        function investigate(place) {
            visited.add(place);
            let text = "";

            if (place === "Chess table") {
                text = "The game ended abruptly. Nothing seems wrong with the chess set.";
            } else if (place === "Kessler’s body") {
                text = "At first, you find no obvious sign of foul play. Looking more closely, you notice a blue tint around Kessler's lips and fingertips. These may be signs of cyanosis.";
                clues.add("Kessler's lips and fingertips have a blue tint.");
            } else {
                text = "The scoresheet looks ordinary, but you notice Kessler's play began to slow down around nine minutes after his tea was served.";
                clues.add("Kessler's scoresheet shows his play slowing down.");
            }

            document.getElementById("game").innerHTML = `
                <h2>${place}</h2>
                <p>${text}</p>
                <p class="note">Clues recorded: ${clues.size}</p>
                <div class="choices">
                    <button onclick="showScene('crimeScene')">Investigate another part of the game room</button>
                    <button onclick="showScene('home')">Return to your notepad</button>
                </div>`;
        }

        function interview(name) {
            interviewed.add(name);
            let dialogue = "";

            if (name === "Marguerite Voss") {
                dialogue = `
                    <p><span class="character">You:</span> "Walk me through your evening before Mr. Kessler collapsed."</p>
                    <p><span class="character">Marguerite:</span> "I was in the game room, same as everyone, watching my student lose gracefully to a man twice her age."</p>
                    <p><span class="character">You:</span> "Did you see anyone near his tea?"</p>
                    <p><span class="character">Marguerite:</span> "The staff brought it around nine. I wasn't paying attention to teacups, detective. I was paying attention to the board."</p>
                    <p><span class="character">You:</span> "You spend a lot of time in the greenhouse, I'm told."</p>
                    <p><span class="character">Marguerite:</span> "It's quiet. Unlike this lodge full of men who think losing gracefully is the same as losing quietly."</p>
                    <p><span class="character">You:</span> "Do you take sugar in your tea?"</p>
                    <p><span class="character">Marguerite:</span> "No. Why do you ask?"</p>`;
            } else if (name === "Lena Okafor") {
                dialogue = `
                    <p><span class="character">You:</span> "How did the match feel?"</p>
                    <p><span class="character">Lena:</span> "Terrifying, like always. He had me on the ropes by move twenty. Then he just slowed down, kept rubbing his temples."</p>
                    <p><span class="character">You:</span> "You argued earlier."</p>
                    <p><span class="character">Lena:</span> "He accused me of studying his old games too closely. Obviously I did. That's how you prepare for a grandmaster."</p>
                    <p><span class="character">You:</span> "Who benefits most from Kessler losing tonight?"</p>
                    <p><span class="character">Lena:</span> "I do. I know how that sounds. I didn't do this."</p>`;
            } else if (name === "Mr. Brandt") {
                dialogue = `
                    <p><span class="character">You:</span> "How's business been, Mr. Brandt?"</p>
                    <p><span class="character">Mr. Brandt:</span> "Wonderful! Full house, wonderful timing—apart from the obvious."</p>
                    <p><span class="character">You:</span> "Is this lodge in financial trouble?"</p>
                    <p><span class="character">Mr. Brandt:</span> "If this gets out before the season ends, there won't be a lodge left standing to worry about."</p>`;
            } else {
                dialogue = `
                    <p><span class="character">You:</span> "What exactly are you working on here?"</p>
                    <p><span class="character">Cass:</span> "A profile piece. 'Grandmaster's Last Stand,' I was calling it. Bit on the nose now, I suppose."</p>
                    <p><span class="character">You:</span> "Did you see anything before the collapse?"</p>
                    <p><span class="character">Cass:</span> "I saw Ms. Voss carrying a cup through the hallway around nine. Coaches fetch things for their players all the time."</p>`;
                clues.add("Cass saw Marguerite carrying a cup around nine.");
            }

            document.getElementById("game").innerHTML = `
                <h2>Interview: ${name}</h2>
                ${dialogue}
                <div class="choices">
                    <button onclick="showScene('interviews')">Interview another suspect</button>
                    <button onclick="showScene('home')">Return to your notepad</button>
                </div>`;
        }

        function room(name) {
            visited.add(name);
            let text = "";
            if (name === "Kitchen") {
                text = "The kitchen is tidy, but a note on the counter records a tea order from Marguerite Voss about an hour before the match. All the teacups are back in the cabinets.";
                clues.add("Kitchen notes show Marguerite ordered tea before the match; all teacups are accounted for.");
            } else if (name === "Conservatory") {
                text = "Among the plants, you notice an unusual arrangement of pots. Behind them is a hidden bottle of sedatives.";
                clues.add("A bottle of sedatives is hidden in the conservatory.");
            } else if (name === "Front lobby") {
                text = "The phone line has been cut. Someone may have wanted to keep the lodge isolated.";
                clues.add("The phone line in the front lobby has been cut.");
            } else if (name === "Kessler’s room") {
                text = "On Kessler's nightstand, you find a bottle of prescribed heart medicine. You bag it as evidence.";
                clues.add("Kessler had prescribed heart medicine in his room.");
            } else if (name === "Marguerite’s room") {
                text = "A teacup rests on Marguerite's nightstand. It looks as though it was used recently.";
                clues.add("A recently used teacup is found in Marguerite's room.");
            } else if (name === "Lena’s room") {
                text = "You find no clear evidence in Lena's room, but catch journalist Cass Delaney snooping outside the door.";
            } else if (name === "Cass’s room") {
                text = "Camera equipment and a typewriter fill the room. You find no clear evidence.";
            } else {
                text = "You search carefully, but find no useful clues here.";
            }

            document.getElementById("game").innerHTML = `
                <h2>${name}</h2>
                <p>${text}</p>
                <p class="note">Clues recorded: ${clues.size}</p>
                <div class="choices">
                    <button onclick="showScene('rooms')">Explore another room</button>
                    <button onclick="showScene('home')">Return to your notepad</button>
                </div>`;
        }

        function accuse(name) {
            let title = "";
            let text = "";

            if (name === "Marguerite Voss") {
                if (clues.size >= 4 && clues.has("A bottle of sedatives is hidden in the conservatory.") &&
                    clues.has("Kitchen notes show Marguerite ordered tea before the match; all teacups are accounted for.")) {
                    title = "Checkmate";
                    text = `You call everyone into the game room.<p><span class="character">You:</span> "You made an excellent cup of tea that night, Ms. Voss. Chamomile, lemon, and one thing that wasn't on the kitchen's usual list—a sedative from the greenhouse."</p><p><span class="character">Marguerite:</span> "I only wanted him to lose. Slowly. Just enough to forfeit. I didn't know about his heart."</p><p><span class="character">You:</span> "Intent doesn't undo what happened. But it will matter when this is over."</p><p class="note">ENDING: CHECKMATE — You gathered enough evidence to expose Marguerite.</p>`;
                } else {
                    title = "Stalemate";
                    text = `You accuse Marguerite, but your evidence is too thin.<p><span class="character">Marguerite:</span> "A bottle in a greenhouse? Truly, Sherlock Holmes trembles. Do let me know if certainty ever grows up into proof."</p><p>She leaves unbothered. Six months later, Lena Okafor is crowned champion, and the truth remains out of reach.</p><p class="warning">ENDING: STALEMATE — Suspicion is not proof.</p>`;
                }
            } else if (name === "Lena Okafor") {
                title = "Blunder";
                text = `You accuse Lena of killing Kessler.<p><span class="character">Lena:</span> "I had a shot at beating him fair, for the first time in four years. That's what I wanted. Not this. Never this."</p><p>Your report overlooks the tea tray. The case is quietly reopened weeks later.</p><p class="warning">ENDING: BLUNDER — You accused the wrong person.</p>`;
            } else {
                title = "Fool's Mate";
                text = `You accuse Mr. Brandt, citing the lodge's debts.<p><span class="character">Mr. Brandt:</span> "I run a ski lodge, not a crime syndicate. You think I poisoned a guest over a mortgage payment?"</p><p>The real culprit is never found. The lodge closes within the year.</p><p class="warning">ENDING: FOOL'S MATE — Your reasoning led you astray.</p>`;
            }

            document.getElementById("game").innerHTML = `
                <h2>${title}</h2>
                ${text}
                <div class="choices"><button onclick="restart()">Play again</button></div>`;
        }

        function restart() {
            clues.clear();
            visited.clear();
            interviewed.clear();
            showScene("crimeScene");
        }