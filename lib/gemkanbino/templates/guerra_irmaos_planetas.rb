# frozen_string_literal: true

module Gemkanbino
  module StoryTemplates
    # Template para história sobre guerra de 5 anos entre dois irmãos por planetas
    class GuerraIrmaosPlanetas < BaseTemplate
      def description
        "A fictional story about two brothers who fought for 5 years over control of the galaxy's largest planets"
      end

      def get_user_options
        {
          brother1_name: {
            type: :string,
            prompt: "Name of the first brother:",
            required: false,
            default: "Alex Stellaris"
          },
          brother2_name: {
            type: :string,
            prompt: "Name of the second brother:",
            required: false,
            default: "Marcus Nebulae"
          },
          planet1_name: {
            type: :string,
            prompt: "Name of the first planet:",
            required: false,
            default: "Nova Terra"
          },
          planet2_name: {
            type: :string,
            prompt: "Name of the second planet:",
            required: false,
            default: "Alpha Prime"
          },
          ending_type: {
            type: :select,
            prompt: "Choose the type of ending:",
            choices: ["reconciliation", "victory", "tragedy", "mystery"]
          }
        }
      end

      def generate_story(title, options = {})
        # Set default values
        brother1_name = options[:brother1_name] || generate_character_names.first
        brother2_name = options[:brother2_name] || generate_character_names.last
        planet1_name = options[:planet1_name] || generate_planet_names.first
        planet2_name = options[:planet2_name] || generate_planet_names.last
        ending_type = options[:ending_type] || "reconciliation"

        chapters = [
          generate_chapter_1(title, brother1_name, brother2_name, planet1_name, planet2_name),
          generate_chapter_2(title, brother1_name, brother2_name, planet1_name, planet2_name),
          generate_chapter_3(title, brother1_name, brother2_name, planet1_name, planet2_name),
          generate_chapter_4(title, brother1_name, brother2_name, planet1_name, planet2_name),
          generate_chapter_5(title, brother1_name, brother2_name, planet1_name, planet2_name, ending_type)
        ]

        {
          title: title,
          chapters: chapters,
          metadata: {
            characters: [brother1_name, brother2_name],
            planets: [planet1_name, planet2_name],
            genres: ["Science Fiction", "Drama", "War"],
            themes: ["brotherhood", "conflict", "power", "redemption"],
            ending_type: ending_type,
            word_count: chapters.sum { |c| c[:content].split.length }
          }
        }
      end

      private

      def generate_chapter_1(title, brother1, brother2, planet1, planet2)
        {
          title: "The Inheritance",
          content: <<~CONTENT
            In the year 2347, the galaxy mourned the passing of Emperor Octavius Stellaris, ruler of the two largest planets in the known universe. His two sons, #{brother1} and #{brother2}, stood before the galactic council as the will was read.

            "To my beloved sons," the holographic message began, "I leave you my greatest treasures: #{planet1} and #{planet2}. But I leave you with a warning - these planets must never be divided, for their power lies in their unity."

            The brothers exchanged glances across the chamber. #{brother1}, the elder by two years, had always been their father's favorite - strategic, patient, and wise beyond his years. #{brother2}, though younger, possessed a brilliance in technology and innovation that bordered on genius.

            "I will rule #{planet1}," #{brother1} declared, his voice echoing through the grand hall. "And #{brother2} shall govern #{planet2}. Together, we shall honor father's wish for unity."

            #{brother2} nodded, but his eyes held a different fire. "Unity sounds... costly. Perhaps there are better ways to manage such valuable assets."

            The council members shifted uncomfortably. They had served the emperor for decades and knew the rivalry that had always simmered between the brothers. What they didn't know was that this moment would spark five years of devastating conflict that would tear the galaxy apart.

            That night, as the brothers retired to their separate chambers, each began making plans that would change the course of history forever.
          CONTENT
        }
      end

      def generate_chapter_2(title, brother1, brother2, planet1, planet2)
        {
          title: "The First Strike",
          content: <<~CONTENT
            Six months after their father's death, the fragile peace between the brothers shattered. #{brother2}, using his technological expertise, had secretly developed a weapon that could disrupt the energy shield protecting #{planet1}'s capital city.

            The attack came without warning. At dawn, as #{planet1}'s citizens went about their daily routines, the sky filled with strange energy patterns. Then came the explosions - precise, devastating, and entirely unexpected.

            #{brother1} watched from his command center as chaos erupted below. "How did they bypass our defenses?" he demanded, his voice tight with controlled rage.

            His second-in-command, General Valeria, shook her head. "It's impossible. Our shields are impenetrable."

            "Nothing is impossible where my brother is concerned," #{brother1} replied, his eyes narrowing. "He's always been clever, but this... this is betrayal."

            Meanwhile, on #{planet2}, #{brother2} monitored the attack's progress with cold satisfaction. "They thought their precious shields made them invincible," he said to his advisors. "Let this be a lesson - technology always finds a way."

            But even as he spoke, reports began coming in of strange energy fluctuations near #{planet2}'s outer colonies. #{brother1} had anticipated retaliation and had prepared his own countermeasures.

            The war had begun, and neither brother realized how high the cost would become.
          CONTENT
        }
      end

      def generate_chapter_3(title, brother1, brother2, planet1, planet2)
        {
          title: "The Middle Years",
          content: <<~CONTENT
            Two years into the conflict, the galaxy had transformed. What began as a dispute between two brothers had drawn in other planetary systems, each choosing sides or attempting to remain neutral. The cost was staggering - millions displaced, entire star systems damaged, trade routes disrupted.

            #{brother1} had proven himself a brilliant military strategist, his forces winning battle after battle through superior tactics and discipline. His armies were efficient, his plans meticulous. Yet each victory felt hollow, each conquered territory a reminder of what had been lost.

            #{brother2}, meanwhile, had turned #{planet2} into a technological fortress. His innovations in warfare changed how battles were fought across the galaxy. Drones, energy weapons, artificial intelligence - all were deployed with devastating effect. But the technological superiority came at a price. His people suffered under the weight of constant production, their resources consumed by the war machine.

            In the quiet moments between battles, both brothers often found themselves remembering their childhood. The summers spent exploring the asteroid belt together, the competitions in the zero-gravity chambers, their father's stories about the unity of their planets. Memories that now seemed like tales from another lifetime.

            "This war cannot last forever," #{brother1} told his council during one rare moment of reflection. "Even if we win, what will be left to rule?"

            On #{planet2}, #{brother2} stared at holographic images of the destruction his weapons had caused. For the first time, he wondered if victory was worth the price of his humanity.
          CONTENT
        }
      end

      def generate_chapter_4(title, brother1, brother2, planet1, planet2)
        {
          title: "The Turning Point",
          content: <<~CONTENT
            As the fourth year of the war began, both brothers had achieved victories that should have ended the conflict. #{brother1}'s forces controlled three-quarters of #{planet2}'s territory, while #{brother2}'s technological arsenal had #{planet1} on the brink of collapse. Yet neither could deliver the final blow.

            The galaxy had grown tired of the war. Neutral systems formed coalitions demanding peace. Former allies began withdrawing their support. The brothers found themselves increasingly isolated, their once-great alliances crumbling.

            It was during this time that strange rumors began circulating - stories about their father's final days, whispers of a third option, a hidden message that could change everything.

            #{brother1}'s intelligence agencies intercepted coded communications suggesting that Emperor Octavius had created something beyond the two planets - a legacy that could only be revealed when his sons truly understood the cost of conflict.

            Meanwhile, #{brother2}'s scientists discovered anomalies in their father's research notes - equations that didn't make sense, references to "unity through separation" and "strength through understanding." It was as if their father had anticipated this exact scenario and left clues for them to follow.

            Separately but simultaneously, both brothers began investigating these mysteries, each convinced they held the key to final victory. Neither realized they were following paths that would lead them to the same destination.

            The war had reached its turning point, not through military might or technological superiority, but through the lingering wisdom of a father who had known his sons better than they knew themselves.
          CONTENT
        }
      end

      def generate_chapter_5(title, brother1, brother2, planet1, planet2, ending_type)
        case ending_type
        when "reconciliation"
          generate_reconciliation_ending(title, brother1, brother2, planet1, planet2)
        when "victory"
          generate_victory_ending(title, brother1, brother2, planet1, planet2)
        when "tragedy"
          generate_tragedy_ending(title, brother1, brother2, planet1, planet2)
        when "mystery"
          generate_mystery_ending(title, brother1, brother2, planet1, planet2)
        else
          generate_reconciliation_ending(title, brother1, brother2, planet1, planet2)
        end
      end

      def generate_reconciliation_ending(title, brother1, brother2, planet1, planet2)
        {
          title: "The Dawn of Understanding",
          content: <<~CONTENT
            Five years to the day since their father's death, #{brother1} and #{brother2} met face to face for the first time since the war began. They had discovered their father's final message separately - a hidden chamber beneath the imperial palace that could only be opened when both brothers were present.

            Inside, they found their father's true legacy: not the planets, not the wealth, but a revelation that changed everything. Their father had discovered that #{planet1} and #{planet2} were not separate worlds at all, but two halves of a single planet-sized entity, divided millennia ago by an ancient catastrophe.

            "The unity I spoke of," the final message read, "was not political or military. It was literal. Your planets are one, and only by working together can you restore what was lost."

            The brothers stood in silence, the weight of five years of destruction crushing them. All the death, all the suffering - it had been for nothing more than a misunderstanding that could have been resolved with communication.

            "I'm sorry," #{brother2} whispered, the words barely audible.

            #{brother1} looked at his brother - really looked at him for the first time in years. The anger, the rivalry, the competition - it all seemed so pointless now. "I'm sorry too," he replied.

            In the days that followed, they ended the war. Not with a treaty or a surrender, but with a commitment to rebuild what they had destroyed and restore their fractured family. Together, they began the greatest project in galactic history - reunifying their two worlds into one.

            The war had cost millions of lives and immeasurable damage, but from the ashes of their conflict rose something new: a testament to the power of forgiveness and the wisdom of a father who had understood that true strength lies not in conquest, but in unity.
          CONTENT
        }
      end

      def generate_victory_ending(title, brother1, brother2, planet1, planet2)
        {
          title: "The Price of Victory",
          content: <<~CONTENT
            After five years of devastating warfare, #{brother1}'s superior military strategy finally prevailed. In a final, decisive battle, his forces broke through #{brother2}'s technological defenses and captured #{planet2}'s capital.

            #{brother2} stood before his brother in chains, the once-brilliant innovator now a defeated prisoner. "You've won," he said, his voice hollow. "I hope it was worth it."

            #{brother1} looked around at the destruction - the shattered buildings, the wounded civilians, the broken infrastructure. His victory had cost him his brother, his humanity, and any hope of真正的 peace. "Victory has its price," he replied, the words tasting like ash in his mouth.

            In the months that followed, #{brother1} established himself as ruler of both planets. But governing a broken empire proved harder than winning the war. Resistance movements emerged on #{planet2}, sabotage became commonplace, and the people's suffering only increased.

            Ten years after his great victory, #{brother1} stood alone in his father's old chamber, looking out at two worlds that hated him. He had everything he had fought for - power, control, victory - but he had lost the only things that had ever mattered.

            Sometimes, in the darkest hours of night, he wondered if his brother had been right all along. Perhaps some victories aren't worth winning, and some prices are too high to pay, even for the greatest prize in the galaxy.
          CONTENT
        }
      end

      def generate_tragedy_ending(title, brother1, brother2, planet1, planet2)
        {
          title: "The Legacy of Ashes",
          content: <<~CONTENT
            Five years of war had pushed both brothers to their limits. In a desperate final gamble, #{brother2} deployed his ultimate weapon - a device that could destroy an entire planet but would also consume its user.

            #{brother1}, learning of this plan through intercepted communications, faced an impossible choice: let #{brother2} destroy #{planet1} and millions of innocent lives, or deploy his own doomsday device in retaliation.

            In the end, both brothers made the same choice. Neither could bear the thought of the other having ultimate power, and neither could tolerate the destruction of what they claimed to protect.

            The twin explosions lit up the galaxy, visible from star systems thousands of light-years away. #{planet1} and #{planet2} vaporized in an instant, along with both brothers and their remaining forces.

            The galactic council, which had failed to prevent the conflict, recorded the tragedy in their archives as "The Brothers' War - a lesson in the dangers of unchecked ambition and the ultimate cost of pride."

            In the centuries that followed, the story of #{brother1} and #{brother2} became a cautionary tale told to children across the galaxy. Two brothers who had everything - wealth, power, worlds to rule - but destroyed it all because neither could share.

            Where the two great planets once orbited, only asteroids remained - silent tombstones in the eternal night, bearing witness to the terrible price of hatred.
          CONTENT
        }
      end

      def generate_mystery_ending(title, brother1, brother2, planet1, planet2)
        {
          title: "The Infinite Game",
          content: <<~CONTENT
            As the fifth year of the war drew to a close, both brothers made discoveries that would change everything. #{brother1}'s forces uncovered evidence that their father had been experimenting with time travel, while #{brother2}'s scientists found proof that their father had been in contact with an advanced alien civilization.

            Separately, both brothers followed these clues to a hidden facility where they found their father's greatest creation: a device that could simulate alternate realities.

            When they activated it together (as the device required both of them), they learned the truth - their father had known about their rivalry and had created this device to show them the consequences of their choices. In simulation after simulation, they saw how their conflict destroyed everything they claimed to protect.

            But the device offered something more: the ability to experience what might have been if they had chosen differently. They saw versions of themselves who had worked together, who had shared their inheritance, who had brought prosperity to both planets instead of destruction.

            After weeks in the simulation, they emerged changed men. But here's the mystery - no one knows what they saw in that final simulation, or what agreement they reached.

            When they returned to their respective capitals, both brothers ordered the immediate cessation of all hostilities. They announced their abdication in favor of a democratic government that would rule both planets jointly.

            Then, together, they entered their father's mysterious device one last time and were never seen again.

            The planets prospered under democratic rule, but questions remained. Had the brothers found a way to travel to another reality? Had they discovered that their entire existence was itself a simulation? Or had they simply found a way to escape the consequences of their actions?

            The device was sealed, and the truth went with them. Some say that on clear nights, you can still see two figures walking among the stars, brothers finally at peace, playing an infinite game in the space between worlds.
          CONTENT
        }
      end
    end
  end
end