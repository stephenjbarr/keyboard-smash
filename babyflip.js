 // Global variables
var Camera;
var Scene;
var Renderer;
var Geometry;
var Material;
var Mesh;
var Loader1;
var Loader2;
var Loader3;
var Texture1;
var Texture2;
var Texture3;

// State
var CurTexture;

// Constants
var DefaultCubeSize  = 200;
var DefaultCubeColor = 0xff0000;

Init();
Animate();

function Init()
{

    // Three textures and associated loaders
    Texture1 = new THREE.Texture();
    Texture2 = new THREE.Texture();
    Texture3 = new THREE.Texture();
    Loader1  = new THREE.ImageLoader();
    Loader2  = new THREE.ImageLoader();
    Loader3  = new THREE.ImageLoader();

    Loader1.addEventListener('load', function (event) {
	    Texture1.image = event.content;
	    Texture1.needsUpdate = true;
	} );

    Loader2.addEventListener('load', function (event) {
	    Texture2.image = event.content;
	    Texture2.needsUpdate = true;
	} );

    Loader3.addEventListener('load', function (event) {
	    Texture3.image = event.content;
	    Texture3.needsUpdate = true;
	} ); 

    Loader1.load('jeffrey_geek_shirt.jpg');
    Loader2.load('carmen_jeffrey_2012_06.jpg');
    Loader3.load('assistant_blogger.jpg');

    // Set initial texture
    CurTexture = Texture1;

    // A camera
    Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    Camera.position.z = 1000;

    // A scene
    Scene = new THREE.Scene();

    Mesh = GenerateCubeMesh(DefaultCubeSize, DefaultCubeColor);
    Scene.add(Mesh);

    Renderer = new THREE.CanvasRenderer();
    Renderer.setSize( window.innerWidth, window.innerHeight );

    // Arrange to handle keyboard events
    document.addEventListener('keydown', OnKeydown, false);

    // Put the object into the document
    document.body.appendChild( Renderer.domElement );
}

function Animate()
{
    requestAnimationFrame(Animate);

    Mesh.rotation.x += 0.01;
    Mesh.rotation.y += 0.02;

    Renderer.render(Scene, Camera);
}

function GenerateCubeMesh(CubeSize, CubeColor)
{
    Geometry = new THREE.CubeGeometry(CubeSize, CubeSize, CubeSize);
    //    Material = new THREE.MeshBasicMaterial({ color: CubeColor, wireframe: true });
    Material = new THREE.MeshBasicMaterial({ map: CurTexture, overdraw: true });
    CubeMesh = new THREE.Mesh(Geometry, Material);

    // Keep extra data until we know how to get it from the Mesh
    CubeMesh.CubeSize = CubeSize;
    return CubeMesh;
}

function OnKeydown(event)
{
    var x;
    if (window.event) // IE8 and earlier
    {
      x = event.keyCode;
    }
    else if (event.which) // IE9/Firefox/Chrome/Opera/Safari
    {
	x = event.which;
    }
    var KeyChar = String.fromCharCode(x);

    switch (KeyChar)
    {
      case 'a':
      case 'A':
	  MoveMeshRight(Mesh);
          break;

      case 'b':
      case 'B':
	  MoveMeshLeft(Mesh);
          break;

      case 'c':
      case 'C':
	  MoveMeshDown(Mesh);
          break;

      case 'd':
      case 'D':
	  MoveMeshUp(Mesh);
          break;

      case 'e':
      case 'E':
	  ReplaceMesh(1.2);
	  break;

      case 'f':
      case 'F':
	  ReplaceMesh(0.8);
          break;

      case 'g':
      case 'G':
	  PickNextTexture();
          ReplaceMesh(1.0);
	  Scene.add(Mesh);
	  break;
    }
}
function MoveMeshRight(SomeMesh)
{
    SomeMesh.position.x += 20;
}

function MoveMeshLeft(SomeMesh)
{
    SomeMesh.position.x -= 20;
}

function MoveMeshDown(SomeMesh)
{
    SomeMesh.position.y += 20;
}

function MoveMeshUp(SomeMesh)
{
    SomeMesh.position.y -= 20;
}

function ReplaceMesh(Scale)
{
    OldCubeSize     = Mesh.CubeSize;
    OldCubePosition = Mesh.position;
    OldCubeRotation = Mesh.rotation;
    Scene.remove(Mesh);
    Mesh = GenerateCubeMesh(OldCubeSize * Scale, DefaultCubeColor);
    Mesh.position = OldCubePosition;
    Mesh.rotation = OldCubeRotation;
    Scene.add(Mesh);
}

function PickNextTexture()
{
    if (CurTexture == Texture1)
	{
	    CurTexture = Texture2;
	}
    else if (CurTexture == Texture2)
	{
	    CurTexture = Texture3;
	}
    else
	{
	    CurTexture = Texture1;
	}
}

