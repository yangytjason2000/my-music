import sys
import os
import subprocess



# example usage: python3 setup.py localhost
#             or pytyon3 setup.py vcm-xxxxx.vm.duke.edu


host = ""
port="8000"
if(len(sys.argv) > 1):
    host = sys.argv[1]
else:
    host = input("Enter host (without port):")

if host[0:4] != "http":
    hostWithHttp = "http://" + host
else:
    hostWithHttp = host

hostWithHttpwithPort = hostWithHttp + ":" + port


flag = True
while (flag):
    print('''
Set Oauth link:
1) fake oauth (http://vcm-32857.vm.duke.edu:8000/)
2) duke oauth (https://oauth.oit.duke.edu/)
3) custom oauth''')

    oauth = ''
    choice = input("Enter your choice (1/2/3):")
    if choice == "1":
        oauth = "http://vcm-32857.vm.duke.edu:8000/"
        flag = False
    elif choice == "2":
        oauth = "https://oauth.oit.duke.edu/"
        flag = False
    elif choice == "3":
        oauth = input("Enter your oauth link:")
        flag = False


api_token = input("Enter your API token:(leave blank to use default test api token)").strip()
if(api_token == "" or api_token== None):
    api_token = "05a8207585b64c582067e1ce989d7d3c"

with open("callback.env","w") as file:
    file.write('''REDIRECT_URI='''+hostWithHttpwithPort+'''/approval-flow/callback/
API_TOKEN='''+api_token+'''
OAUTH_SERVER='''+oauth)
    file.close()

settingFile = "./web-app/approval_flow_web_app/settings.py"
content = ''
with open(settingFile, 'r') as file:
    content = file.read()
    file.close()


start = content.find("ALLOWED_HOSTS")
end = content.find("]",start)+1
content = content.replace(content[start:end],"ALLOWED_HOSTS = ['web','"+host+"']")

start = content.find("CSRF_TRUSTED_ORIGINS")
end = content.find("]",start)+1
content = content.replace(content[start:end],"CSRF_TRUSTED_ORIGINS = ['"+hostWithHttpwithPort+"']")

with open(settingFile,"w") as file:
    file.write(content)
    file.close()

#p=subprocess.Popen(["ls"],cwd="./web-app")
#p.wait()
#os.system("cd web-app")
#os.system("ls")


os.system("rm -rf ./web-app/approval_flows/migrations")
p=subprocess.Popen(["ls"],cwd="./web-app")
p.wait()
p=subprocess.Popen(["python3","manage.py","makemigrations","approval_flows"],cwd="./web-app")
p.wait()