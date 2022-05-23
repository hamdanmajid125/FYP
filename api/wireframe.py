


class WireFrame:
    def __init__(self,screendetails,controlnames):
        self.screendetails = screendetails
        self.controlnames = controlnames
        

        self.start = """<!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Bootstrap demo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
            """

    def main(self):
        for screen in self.controlnames:
            content = ""
            screencontrols = self.controlnames[screen]

            for i in screencontrols:

                if(i == 'TextBoxes'):
                    content = content+'<div id="textboxes">'
                    for j in screencontrols["TextBoxes"]:
                        content = content + '<input class="form-control" type="text"  placeholder='+j+'> <br>\n'
                    content = content + '</div>'
                if(i == 'ComboBoxes'):
                    content = content+'<div id="combo">'
                    for j in screencontrols["ComboBoxes"]:
                        content = content + '<input class="form-control" tyoe="select" placeholder='+j+'> <br>\n'
                    content = content + '</div>'
                if(i == 'RadioButtons'):
                    content = content+'<div id="radio">'
                    for j in screencontrols["RadioButtons"]:
                        content = content + '<input class="form-check-input" type="radio" name=' + \
                            j+' id='+j+'> <label class="form-check-label">'+j+'</label>\n '
                    content = content + '</div>'
                if(i == 'CheckBoxes'):
                    content = content+'<div id="check">'
                    for j in screencontrols["CheckBoxes"]:
                        content = content + '<input class="form-check-input" type="checkbox" value="" id=' + \
                            j+'> <label class="form-check-label" for='+j+'> '+j+' </label>\n '
                    content = content + '</div>'
                if(i == 'Buttons'):
                    content = content+'<div id="check">'
                    for j in screencontrols["CheckBoxes"]:
                        content = content + '<input class="form-check-input" type="checkbox" value="" id=' + \
                            j+'> <label class="form-check-label" for='+j+'> '+j+' </label> '
                    content = content + '</div>\n'
            if(self.screendetails["BUTTONS"][screen] != None):
                content = content + '<div id="buttons-groups">'
                for i in self.screendetails["BUTTONS"][screen]:
                    content = content + '<button class="btn btn-primary"> '+i+'</button>\n'
                content = content + '</div>'
            content = content + """\n </div>\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
        </body>
        </html>"""
            file = open(''+screen+'.html',"w")
            file.write(self.start+content)
            file.close()
            return True
