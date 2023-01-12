{
  'variables': {
    'module_name': 'native',
    'root_dir': '<(PRODUCT_DIR)/../../'
  },
  "targets": [
    {
      "target_name": "<(module_name)",
      "sources": [
        "src/native/windows.c"
      ]
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [
        "<(module_name)"
      ],
      "copies": [
          {
            "files": [
              "<(PRODUCT_DIR)/<(module_name).node"
            ],
            "destination": "<(root_dir)/bin"
          },
          {
            "files": [
              "<(root_dir)/src/electray/native.d.ts"
            ],
            "destination": "<(root_dir)/lib"
          }
      ]
    }
  ]
}