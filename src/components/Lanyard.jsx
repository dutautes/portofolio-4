/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// TARUH ASET 3D KAMU DI SINI:
// Masukin berkas model 3D card.glb dan gambar lanyard.png di dalem folder src/assets/lanyard/
import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';

import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

// Komponen utama Lanyard. Di dalamnya ada Canvas WebGL Three.js buat ngerender simulasi 3D.
export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  // Cek apakah user pake HP biar bisa disesuaikan FPS dan performanya
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        {/* Bungkus simulasi fisika Rapier. Ngatur gravitasi dan kecepatan hitung per frame */}
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        
        {/* Pengaturan lingkungan (HDRI reflection) biar material kartu mantulin cahaya alami */}
        <Environment blur={0.75}>
          {/* Lightformer itu kayak neon box studio foto, biar kartu 3D-nya ada efek pantulan cahaya garis putih kinclong */}
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

// Komponen Band: Ini adalah bagian tali lentur (MeshLine) dan ID card-nya
function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(), // Gantungan atas yang diem terkunci di langit-langit
    j1 = useRef(),    // Segmen tali 1
    j2 = useRef(),    // Segmen tali 2
    j3 = useRef(),    // Segmen tali 3
    card = useRef();  // Kartu ID Card di ujung paling bawah
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
    
  // Properti fisik untuk objek dinamis: linear/angular damping itu kayak gesekan udara biar ga ngayun terus selamanya
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  // Impor model 3D card (.glb) dan tekstur tali gambar (.png)
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);

  // Kurva bezier CatmullRom buat bikin tali melengkung luwes di antara tiap sendi fisik
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Sambungin tiap potongan tali pake RopeJoint biar kayak rantai tali fisik
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.5]);
  // Sambungin tali segmen terakhir (j3) ke kartu (card) pake SphericalJoint (sendi engsel putar bebas)
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  // Ganti kursor mouse jadi 'grab' atau 'grabbing' pas kursor di atas kartu
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // Loop update tiap frame 3D (tick loop)
  useFrame((state, delta) => {
    if (dragged) {
      // Proyeksi koordinat 2D mouse ke dunia 3D (unproject) biar bisa narik kartu pake mouse
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp()); // Bangunin mesin fisika biar kalkulasinya jalan
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    
    if (fixed.current) {
      // Interpolasi pergerakan sendi tali biar lekukan talinya keliatan halus
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      // Update posisi titik kurva bezier tali berdasarkan koordinat sendi fisik saat ini
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      
      // Kasih gaya hambatan angin buat muter kartu biar ga spin kenceng terus-terusan
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.1, 0.1, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card?.geometry || nodes.card_1?.geometry}>
              <meshPhysicalMaterial
                map={materials.base?.map || materials.metal?.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip?.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp?.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
