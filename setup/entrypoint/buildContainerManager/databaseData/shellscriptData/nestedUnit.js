let data = [
    
    /**
     * Run containers
     */
    {
        key: '3c2b14ae-7977-4029-bc54-1acc51f129a5',
        label: {
            name: 'Run containers'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'allPromise'
            },
            {
                key: '419cd911-9bf6-45ef-8534-565dcec6e093',
                order: 2, 
                executionType: 'chronological'
            },
        ],
        children: [
            {
                nestedUnit: '92826780-d0b0-4fb9-964e-2945d7a03bfc',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: 'aaa32384-8d13-4424-8853-dd62141a91b9',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: '561b4a35-5250-439d-a692-2a761aa714ef',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '419cd911-9bf6-45ef-8534-565dcec6e093'
                }
            },
            {
                nestedUnit: 'vv76d0b7-aa35-47fa-ac63-59fc594356vv',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '419cd911-9bf6-45ef-8534-565dcec6e093'
                }
            },

        ],
    },
    { key: '92826780-d0b0-4fb9-964e-2945d7a03bfc', label: { name: 'run rethinkdb temporary container' },
      unit: '63fa6973-58c1-4ae9-b2c3-3a001d94cedd', insertionPoint: [], children: [], },
    { key: 'aaa32384-8d13-4424-8853-dd62141a91b9', label: { name: 'run dockerfile build container' }, 
      unit: 'bcc280d1-2dd3-4e57-be19-a11821adc2d4', insertionPoint: [], children: [], },
    { key: '561b4a35-5250-439d-a692-2a761aa714ef', label: { name: 'stop/remove container rethinkdb which was used for build' }, 
      unit: '7aac8cd8-9399-471c-a14f-a281ea086550', insertionPoint: [], children: [], },


    /*
     * Tag & push image
     */
    {
        key: 'vv76d0b7-aa35-47fa-ac63-59fc594356vv',
        label: {
            name: 'Tag and push image'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'chronological'
            },
        ],
        children: [
            {   nestedUnit: '2vs3d6f5-5250-439d-a692-2a761aa714ef', pathPointerKey: 'XYZ3', insertionPosition: { insertionPathPointer: null,  insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7' } },
            {   nestedUnit: '1vs3d6f5-5250-439d-a692-2a761aa714ef', pathPointerKey: 'XYZ3', insertionPosition: { insertionPathPointer: null,  insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7' } },
            {   nestedUnit: 'a8d9f6e3-5250-439d-a692-2a761aa714ef', pathPointerKey: 'XYZ3', insertionPosition: { insertionPathPointer: null,  insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7' } },
            {   nestedUnit: 'c3x4a7g9-5250-439d-a692-2a761aa714ef', pathPointerKey: 'XYZ3', insertionPosition: { insertionPathPointer: null,  insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7' } },
        ],
    },
    { key: '2vs3d6f5-5250-439d-a692-2a761aa714ef', label: { name: 'tag image' }, 
      unit: '02ic4cd8-9399-471c-a14f-a281ea086550', insertionPoint: [], children: [], },
    { key: '1vs3d6f5-5250-439d-a692-2a761aa714ef', label: { name: 'tag image' }, 
      unit: '13cv6e28-9399-471c-a14f-a281ea086550', insertionPoint: [], children: [], },
    { key: 'a8d9f6e3-5250-439d-a692-2a761aa714ef', label: { name: 'push image latest' }, 
      unit: '93cv6e28-9399-471c-a14f-a281ea086550', insertionPoint: [], children: [], },
    { key: 'c3x4a7g9-5250-439d-a692-2a761aa714ef', label: { name: 'push image tagged' }, 
      unit: '3f6e9f56-9399-471c-a14f-a281ea086550', insertionPoint: [], children: [], },

];

export default {
    databaseTableName: 'nestedUnit',
    data: data
}