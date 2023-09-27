Import('env')
import gzip
from typing import Tuple

def make_c_header(in_name: str, out_name: str) -> None:

   print('Writing ', in_name, ' to src/sensesp/net/web/static/', out_name, '.h')

   with open('web/docroot/' + in_name, "rb") as infile:
      in_file_bytes = infile.read()
      print('Compressing into gzip...')
      in_file_gzipped = gzip.compress(in_file_bytes)
      print('Non compressed size is ', str(len(in_file_bytes)), ", gzipped size is ", str(len(in_file_gzipped)), ".")
      with open("src/sensesp/net/web/static/" + out_name + ".h","w") as outfile:
         print('Generating header file...')
         outfile.write("#include <pgmspace.h>\n")
         outfile.write("const char PAGE_")
         outfile.write(out_name)
         outfile.write("[] = {\n\t\t")
         line_break = 7
         for b in in_file_gzipped:
            outfile.write(hex(b))
            outfile.write(",")
            if line_break == 0:
               outfile.write("\n\t\t")
               line_break = 8
            line_break -= 1

         outfile.write("};\n\n")
         #const uint PAGE_index_size = 8;

def build_web_ui(*args, **kwargs) -> None:
   env.Execute("terser --compress --output web/docroot/js/sensesp.min.js -- web/docroot/js/sensesp.js")
   make_c_header("js/sensesp.min.js", "js_sensesp")
   make_c_header("js/jsoneditor.min.js", "js_jsoneditor")
   make_c_header("css/bootstrap.min.css", "css_bootstrap")
   make_c_header("index.html", "index")

env.AlwaysBuild(env.Alias("webUI", None, build_web_ui))
