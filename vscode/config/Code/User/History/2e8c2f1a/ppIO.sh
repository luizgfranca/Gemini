

if [ "$1" == "" ]; then
    echo 'usage: ./tools/release <version>'
    exit
fi

echo "building project"
cd build
cmake ..
make
make package
cd ..

RELEASE_PATH="dist/sism-$1"

echo "preparing release structure"
rm -rf "$RELEASE_PATH" 

mkdir dist
mkdir "$RELEASE_PATH"
mkdir "$RELEASE_PATH/scripts"
mkdir "dist/sism-$1-1.amd64"

echo "copying build artifacts"
cp build/sism "$RELEASE_PATH"
cp tools/dependencies-fedora.sh "$RELEASE_PATH/scripts"
cp tools/dependencies-ubuntu.sh "$RELEASE_PATH/scripts"
cp tools/install.sh "$RELEASE_PATH"

echo "preparing DEB build"
mkdir "dist/sism-$1-1.amd64/bin"
mkdir "dist/sism-$1-1.amd64/DEBIAN"
cp tools/control dist/sism-$1-1.amd64/DEBIAN/
cp build/sism "dist/sism-$1-1.amd64/bin"

echo "copying generated RPM"
cp "build/sism-$1-1.x86_64.rpm" "dist/"

cd dist

echo "zipping binary files"
zip -r "sism-$1.zip" "sism-$1" 

echo "Release packaged successfully!"
echo "Executable: $RELEASE_PATH.zip"
echo "RPM Package: dist/sism-$1-1.x86_64.rpm"