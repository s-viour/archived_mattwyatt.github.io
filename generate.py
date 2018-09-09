import os
import markdown2


def read_entries(directory):
	arr = []
	entry_dir = "entries/{}".format(directory)
	for file in os.listdir(entry_dir):
		opened = open("{}/{}".format(entry_dir, file), "r")
		text = opened.read()
		opened.close()

		arr.append(text)
	return arr

def generate_entries(entries, preview=False):
	template = open("entries/_template", "r").read()
	letter = "<div class='letter'>{}</div>"
	new_entries = []
	for e in entries:
		if preview:
			if len(e) > 300:
				new_entries.append(e[:300] + "...")
		else:
			new_entries.append(e)
	text = "".join(letter.format(markdown2.markdown(e, extras=["fenced-code-blocks"])) for e in new_entries)
	return template.format(text)

def generate_work_page():
	work_entries = read_entries("work")
	with open("work.html", "w+") as f:
		f.write(generate_entries(work_entries))
		f.close()

def generate_diary_pages():
	for filename in os.listdir("entries/diary"):
		diary = open("{}.html".format(filename.split(".")[0]), "w+")
		entry = open("entries/diary/{}".format(filename))
		text = entry.read()
		diary.write(generate_entries([text]))
		diary.close()
		entry.close()

def generate_diary_previews():
	diary_entries = read_entries("diary")
	with open("diary.html", "w+") as f:
		f.write(generate_entries(diary_entries, preview=True))
		f.close()

if __name__ == "__main__":
	generate_work_page()
	generate_diary_pages()
	generate_diary_previews()