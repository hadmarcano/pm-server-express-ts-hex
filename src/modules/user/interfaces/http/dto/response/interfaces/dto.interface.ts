// 1- With interfaces
// interface: Its not part of compiling because interface not exists for javascript
// export interface IDTO<Properties, DTO> {
//    execute(data: Properties): DTO
// }

// For implement IDTO:
// class implements IDTO<Properties,DTO>{...}

// 2- With class
// class: Its part of compiling
export abstract class DTO<Properties, DTO> {
   abstract execute(data: Properties): DTO
}

// For implement the class:
// class _x extends DTO<Properties, DTO>{...}
